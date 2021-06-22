
export function isUserLecturer() {
    let UserData = JSON.parse(sessionStorage.getItem('User'));
    return UserData.Permission === 1;
}

export function isUserLoggedIn() {
    let UserData = JSON.parse(sessionStorage.getItem('User'));
    return UserData !== null;
}


export function redirectIfNotLecturer(props){
    if(!isUserLoggedIn()){
        props.history.push('/home');
        return;
    }

    if(!isUserLecturer()){
        props.history.push('/home');
    }
}

export function redirectIfNotStudent(props){
    if(!isUserLoggedIn()){
        props.history.push('/home');
        return;
    }

    if(isUserLecturer()){
        props.history.push('/home');
    }
}
