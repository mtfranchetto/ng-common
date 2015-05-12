self.onmessage = function (message) {
    try {
        self.postMessage({
            result: JSON.parse(message.data.data)
        });
    } catch (error) {
        self.postMessage({
            result: message.data.data
        });
    }
    self.close();
};
