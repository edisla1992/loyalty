module.exports = class Errors {

    output(code, data) {

        var result;

        switch(code) {
            case 1:
                result = "<h2>Controller no found</h2><br>" + data;
                break;
            case 2:
                result = "<h2>Function no found</h2><br>" + data;
                break;
            case 3:
                result = "<h2>Rute no found</h2><br>Please add this url to route config";
                break;
            case 4:
                result = "<h2>View " + data.name + " no found</h2><br>" + data.file;
                break;
        }

        return result;

    }

}