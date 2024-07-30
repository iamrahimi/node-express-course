const {people} = require("../data");

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people});
};


const addPerson = (req, res) => {
    console.log(req.body);
    const {name} = req.body;
    if(!name){
        return res
            .status(400)
            .json({ success: false, msg: "Please provide a name" });
    }else {
        people.push({ id: people.length + 1, name: req.body.name });
        return res.status(201).json({ success: true, person: name });
    }
};


module.exports = {
    getPeople, addPerson
}
