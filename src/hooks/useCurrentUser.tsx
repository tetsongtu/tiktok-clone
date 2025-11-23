import { useState } from 'react';

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState(false);
    return { currentUser, setCurrentUser };
}

export default useCurrentUser;
