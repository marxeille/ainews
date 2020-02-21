import {
  call, put, take, race, delay
} from 'redux-saga/effects';
import {
  ACTION_MARK_REQUEST_PENDING,
  ACTION_MARK_REQUEST_SUCCESS,
  ACTION_MARK_REQUEST_CANCELLED,
  ACTION_MARK_REQUEST_FAILED,
  ACTION_PREPARE_ACCESS_TOKEN,
  ACTION_PREPARE_ACCESS_TOKEN_SUCCESS,
  ACTION_PREPARE_ACCESS_TOKEN_ERROR
} from './constants';
import HTTPRequestError from './errors/HTTPRequestError';
import AccessTokenUnavailableError from './errors/AccessTokenUnavailableError';
import RequestCancelledError from './errors/RequestCancelledError';
import RequestNotDefinedError from './errors/RequestNotDefinedError';
import RequestTimeoutError from './errors/RequestTimeoutError';
import { removeAccessToken, removeRefreshToken } from './token/actions';

AccessTokenUnavailableError;

const markRequestPending = key => ({
  type: ACTION_MARK_REQUEST_PENDING,
  meta: { key }
});

const markRequestSuccess = key => ({
  type: ACTION_MARK_REQUEST_SUCCESS,
  meta: { key }
});

const markRequestCancelled = key => ({
  type: ACTION_MARK_REQUEST_CANCELLED,
  meta: { key }
});

const markRequestFailed = (key, error) => ({
  type: ACTION_MARK_REQUEST_FAILED,
  meta: { key, error }
});

function* activateAllActionCreators(actionCreators, ...params) {
  // eslint-disable-next-line no-restricted-syntax
  for (const actionCreator of actionCreators) {
    const action = actionCreator(...params);
    yield put(action);
  }
}

type TokenRequiredOption = 'required' | 'non_required' | 'optional';

type RequestSagaProps = {
  request: any => any,
  key: String,
  timeout: Number,
  cancel: Number,
  tokenRequired: TokenRequiredOption,
  onStartActionCreators: [(any) => any],
  onStopActionCreators: [(any) => any],
  onSuccessActionCreators: [(any) => any],
  onErrorActionCreators: [(any) => any],
  onCancelActionCreators: [(any) => any]
};

export const createRequestSaga = ({
  request,
  key,
  timeout = 30000,
  cancel,
  tokenRequired = 'non_required',
  onStartActionCreators = [],
  onStopActionCreators = [],
  onSuccessActionCreators = [],
  onErrorActionCreators = [],
  onCancelActionCreators = []
}: RequestSagaProps) => function* requestGenerator(action) {
  let args = action.args || [];
  const callback = typeof args[args.length - 1] === 'function'
    ? args[args.length - 1]
    : null;
  if (callback) {
    args = args.slice(0, -1);
  }

  let ret = null;
  let err = null;

  const requestKey = typeof key === 'function' ? key(...args) : key;
  yield activateAllActionCreators(onStartActionCreators, action);

  yield put(markRequestPending(requestKey));

  try {
    if (tokenRequired !== 'non_required') {
      yield put({
        type: ACTION_PREPARE_ACCESS_TOKEN
      });

      const prepareAccessTokenRaceOptions = {
        takeSuccess: take(ACTION_PREPARE_ACCESS_TOKEN_SUCCESS),
        takeError: take(ACTION_PREPARE_ACCESS_TOKEN_ERROR)
      };

      const { takeSuccess, takeError } = yield race(
        prepareAccessTokenRaceOptions
      );

      if (takeSuccess) {
        const { token } = takeSuccess.payload;
        args.unshift(token);
      }

      if (takeError) {
        yield put(removeAccessToken());
        yield put(removeRefreshToken());
        if (tokenRequired === 'optional') {
          args.unshift('');
        } else {
          throw new AccessTokenUnavailableError();
        }
      }
    }

    if (!request) {
      throw new RequestNotDefinedError();
    }

    const raceOptions = {
      response: call(request, ...args),
      isTimeout: delay(timeout)
    };
    if (cancel) {
      raceOptions.cancelRet = take(cancel);
    }

    const { response, isTimeout, cancelRet } = yield race(raceOptions);
    if (isTimeout) {
      throw new RequestTimeoutError();
    }

    if (cancelRet) {
      yield activateAllActionCreators(
        onCancelActionCreators,
        cancelRet,
        requestKey
      );
      yield put(markRequestCancelled(cancelRet, requestKey));

      throw new RequestCancelledError();
    }

    const { status, data, ok } = response;
    ret = data;
    if (!ok) {
      throw new HTTPRequestError(status, data);
    }
    yield activateAllActionCreators(onSuccessActionCreators, data);

    yield put(markRequestSuccess(requestKey));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('RequestSagaUtils error', error);
    yield activateAllActionCreators(onErrorActionCreators);

    yield put(markRequestFailed(requestKey, error));

    err = error;
  } finally {
    yield activateAllActionCreators(onStopActionCreators);
    if (callback) {
      if (err === null && ret === null) {
        callback(new RequestCancelledError());
      } else {
        callback(err, ret);
      }
    }
  }
};
