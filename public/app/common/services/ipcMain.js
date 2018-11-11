angular.module('quizApp')
.factory('ipcMain', ipcMain);

// ipcMain.$inject = [];
function ipcMain() {
    let data = {};
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