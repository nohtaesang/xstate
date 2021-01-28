import { Machine } from "xstate";

export const authMachine = Machine(
  {
    id: "authentication",
    initial: "unauthorized",
    context: {
      newLink: null,
      errorMessage: null
    },
    states: {
      unauthorized: {
        on: {
          LOGIN: "loading"
        }
      },
      loading: {
        on: {
          LOGIN_SUCCESS: {
            target: "authorized",
            actions: ["onSuccess"]
          },
          LOGIN_ERROR: {
            target: "unauthorized",
            actions: ["onError"]
          }
        }
      },
      authorized: {
        on: {
          LOGOUT: "unauthorized"
        }
      }
    }
  },
  {
    actions: {
      onSuccess: (context, event) => {
        if (event.reverse) {
          context.newLink = "/";
        } else {
          context.newLink = null;
        }
        context.errorMessage = null;
      },
      onError: (context, event) => {
        if (event.reverse) {
          context.newLink = null;
        } else {
          context.newLink = "/login";
        }
        context.errorMessage = event.errorMessage;
      }
    }
  }
);
