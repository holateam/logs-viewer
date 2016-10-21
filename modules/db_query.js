const Users = require('./userSchema');

module.exports.getUsers = () => {
    let promise = new Promise((resolve, reject) => {
        Users.find({}, (err, res) => {
            if (err) {
                reject(err);
            }
            let array = [];
            res.forEach(user => {
                array.push(user);
            });
            resolve(array);
        });
    });
    return promise;
};

module.exports.saveAddressOfFile = (userHost, userPort, nameStream, addressFile) => {
    console.log("--->  save address file in db: " + addressFile);
    Users.findOne({host: userHost, port: userPort}, (err, doc) => {
        doc.streams.forEach(stream => {
            if (stream.name == nameStream) {
                stream.fileslist.push({namefile: addressFile});
            }
        });
        doc.save();
    });
};
