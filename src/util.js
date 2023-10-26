const topics = {
    it: 'Information Technology',
    languages: 'Languages',
    hardware: 'Hardware',
    software: 'Software',
    frameworks: 'Frameworks'
};

function getUserData() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

function setUserData(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function clearUserData() {
    localStorage.removeItem('user');
}

export {
    topics,
    getUserData,
    setUserData,
    clearUserData
};