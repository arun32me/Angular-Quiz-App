angular.module('quizApp')
.factory('ipcMain', ipcMain);

// ipcMain.$inject = [];
function ipcMain() {
    const data = {};
    const ipcMainObject = {
        get,
        set
    }
    return ipcMainObject;

    function get(key) {
        try {
            return data[key];
        } finally {
            data = {};
        }
    }

    function set(key, value) {
        data[key] = value;
    }
}