// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    firebaseConfig: {
        apiKey: 'AIzaSyDr2tsNXdWFlF_dbMGC3kVZhK5y_pkcaFQ',
        authDomain: 'scheduler-1234.firebaseapp.com',
        databaseURL: 'https://scheduler-1234.firebaseio.com',
        projectId: 'scheduler-1234',
        storageBucket: 'scheduler-1234.appspot.com',
        messagingSenderId: '951760843934'
      }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
