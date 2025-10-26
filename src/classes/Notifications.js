export class Notifications {
    static listeners = {};

    static subscribe(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    static emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => {
                try {
                    cb(data);
                } catch (error) {
                    console.error(`Error in listener for "${event}": `, error);
                }
            });
        }
    }

    static unsubscribe(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

}