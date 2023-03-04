import { catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function appInitializer(authService: AuthService) {
    return () => {
        if (authService.userValue) {
            authService.refreshToken().pipe(
                catchError((err) => {
                    return of()
                })
            ).subscribe();
        }
    }
}