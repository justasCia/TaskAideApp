import { catchError, of } from 'rxjs';
import { User } from '../models/auth/User';
import { AuthService } from '../services/auth.service';

export function appInitializer(authService: AuthService) {
    // return () => {
    //     const cachedUser = localStorage.getItem("user");
    //     if (cachedUser !== null) {
    //         const user = new User();
    //         Object.assign(user, JSON.parse(cachedUser));
    //         // this.refreshToken().subscribe();
    //         if(!user.expires || new Date(user.expires) < new Date()) {
    //           authService.refreshToken().pipe(catchError(() => of()))
    //         }
    //       }
    // }
    return () => authService.refreshToken()
        .pipe(
            // catch error to start app on success or failure
            catchError(() => of())
        );
}