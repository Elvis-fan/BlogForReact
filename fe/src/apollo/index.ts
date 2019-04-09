import ApolloClient,{Operation} from "apollo-boost";
import { getToken } from "@/tools";
import { ErrorResponse } from "apollo-link-error";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  async request({setContext}: Operation): Promise<void>{
    const token = getToken()
    const headers: any = {}
    if(token){
      headers.token = token
    }
    setContext((context: any) => ({
      ...context,
      headers: {
        ...context.headers,
        ...headers
      },
    }))
  }
  // onError:({ graphQLErrors, networkError, operation, forward }: ErrorResponse)=>{
  //   if (graphQLErrors) {
  //     for (let err of graphQLErrors) {
  //       console.log(err.message)
  //       switch (err.extensions.code) {
  //         case 'GRAPHQL_VALIDATION_FAILED':
  //           // const headers = operation.getContext().headers
  //           // operation.setContext({
  //           //   headers: {
  //           //     ...headers,
  //           //     // authorization: getNewToken(),
  //           //   },
  //           // });

  //           return forward(operation)
  //         case 'ANOTHER_ERROR_CODE':
  //           break
  //       }
  //     }

  //   }

  // }
});
