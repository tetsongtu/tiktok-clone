import { useState, useEffect } from 'preact/hooks';
import { useCurrentUser } from '~/shared/hooks';
import * as searchService from '~/core/services/searchService';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'not_found';

interface ProfileState {
    data: any;
    status: Status;
    error?: string;
}

export function useProfileData(nickname: string) {
    const { user } = useCurrentUser();
    const [state, setState] = useState<ProfileState>({
        data: null,
        status: 'idle',
    });

    useEffect(() => {
        if (!nickname || !/^[a-zA-Z0-9_]+$/.test(nickname) || nickname.length > 30) {
            setState({ data: null, status: 'error', error: 'Invalid username' });
            return;
        }

        if (user?.nickname === nickname) {
            setState({ data: user, status: 'success' });
            return;
        }

        if (user === undefined) {
            setState({ data: null, status: 'loading' });
            return;
        }

        let isCancelled = false;
        setState({ data: null, status: 'loading' });

        searchService
            .search(nickname, 'less')
            .then((results) => {
                if (isCancelled) return;

                const foundUser = results?.find((u: any) => u.nickname === nickname);
                setState(
                    foundUser
                        ? { data: foundUser, status: 'success' }
                        : { data: null, status: 'not_found', error: 'User not found' },
                );
            })
            .catch(() => {
                if (!isCancelled) {
                    setState({
                        data: null,
                        status: 'error',
                        error: 'Failed to load profile',
                    });
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [nickname, user]);

    return state;
}
