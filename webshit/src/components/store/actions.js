
/*
 * Store Actions
 */

import { create } from "../../middleware/requests"

export const DEPOSIT_REQUEST = "store/DEPOSIT_REQUEST";
export const DEPOSIT_SUCCESS = "store/DEPOSIT_SUCCESS";
export const DEPOSIT_ERROR = "store/DEPOSIT_ERROR";

export const PURCHASE_REQUEST = "store/PURCHASE_REQUEST";
export const PURCHASE_SUCCESS = "store/PURCHASE_SUCCESS";
export const PURCHASE_ERROR = "store/PURCHASE_ERROR";

export const MAIN_SCREEN_TRANSITION_REQUEST = "store/MAIN_SCREEN_TRANSITION_REQUEST";
export const MAIN_SCREEN_TRANSITION_SUCCESS = "store/MAIN_SCREEN_TRANSITION_SUCCESS";

export const TRANSFER_SET_AMOUNT = "store/TRANSFER_SET_AMOUNT";
export const TRANSFER_REQUEST = "store/TRANSFER_REQUEST";
export const TRANSFER_SUCCESS = "store/TRANSFER_SUCCESS";
export const TRANSFER_ERROR = "store/TRANSFER_ERROR";


export const depositRequest = () => ({
  type: DEPOSIT_REQUEST,
});

export const depositSuccess = (result) => {
  const {user, oldBalance, newBalance} = result;
  return {
    type: DEPOSIT_SUCCESS,
    payload: {
      user: user,
      oldBalance: oldBalance,
      newBalance: newBalance,
    }
  }
}

export const depositError = (error) => ({
  type: DEPOSIT_ERROR,
  payload: {
    error: error,
  }
});

export const deposit = (user, amount) => create(
  `/api/v1/users/${user.id}/deposit`, {
    amount: amount,
  },
  depositRequest,
  depositSuccess,
  depositError,
  true,
);


export const purchaseSuccess = (result) => {
  const {product, user} = result;

  return {
    type: PURCHASE_SUCCESS,
    payload: {
      product: product,
      user: user,
    }
  };
};

export const purchaseRequest = () => ({
  type: PURCHASE_REQUEST,
  payload: {},
});

export const purchaseError = (error) => ({
  type: PURCHASE_ERROR,
  payload: {
    error: error,
  }
});

export const purchase = (user, product) => create(
  `/api/v1/users/${user.id}/purchase`, {
    product: product.id,
  },
  purchaseRequest,
  purchaseSuccess,
  purchaseError,
  true, 
);


export const mainScreenTransitionRequest = () => ({
  type: MAIN_SCREEN_TRANSITION_REQUEST,
  payload: {},
});


export const mainScreenTransitionSuccess = () => ({
  type: MAIN_SCREEN_TRANSITION_SUCCESS,
  payload: {},
});


export const transferSetAmount = (amount) => ({
  type: TRANSFER_SET_AMOUNT,
  payload: {
    amount: amount,
  }
});

export const transferRequest = () => ({
  type: TRANSFER_REQUEST,
  payload: {},
});

export const transferSuccess = (result) => {
  const {fromUser, toUser} = result;

  return {
    type: TRANSFER_SUCCESS,
    payload: {
      fromUser,
      toUser,
    }
  }
    
};

export const transferError = (error) => ({
  type: TRANSFER_ERROR,
  payload: {
    error,
  }
});


export const transfer = (fromUser, toUser, amount) => create(
  `/api/v1/transfers`, {
    "to_user": toUser.id,
    "from_user": fromUser.id,
    "amount": amount,
  },
  transferRequest,
  transferSuccess,
  transferError,
  true, // blocking
);

