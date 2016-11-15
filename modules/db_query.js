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

module.exports.signIn = (obj) => {
  let promise = new Promise((resolve, reject) => {
      Users.findOne({email: obj.email, password: obj.password}, (err, user) => {
          if(err) reject(err);
          // if(!err) resolve(false);
          resolve(user);
      });   
  });
    return promise;
};

module.exports.getNameStreams = (userHost, userPort) => {
    let promise = new Promise((resolve, reject) => {
        User.findOne({host: userHost, port: userPort}, (err, res) => {
            if (err) {
                reject(err);
            }
            let array = [];
            res.streams.forEach(obj => {
                array.push(obj.name);
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
        doc.save((err) => {
            if(err) console.log(err);
        });
    });
};
