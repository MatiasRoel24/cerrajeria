export const handleErrors = (location: string, method: string, message: string): Error => {
    const time = new Date().toLocaleTimeString();
    throw new Error(`${time} - Error - [ ${location.toUpperCase()} ] - METHOD: [${method}]: ${message}`);
};