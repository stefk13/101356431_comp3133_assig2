import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { HttpLink } from 'apollo-angular/http';
import { myUrl } from "../app/graphql.config";
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        httpLink: HttpLink,
      ): ApolloClientOptions<unknown> => ({
        link: ApolloLink.from([
          httpLink.create({ uri: myUrl }),
        ]),
        cache: new InMemoryCache(),
      }),
      deps: [HttpLink],
    },
    Apollo
  ]
};
