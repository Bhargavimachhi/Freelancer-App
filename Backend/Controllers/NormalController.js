

const SayHicontroller = (req, res) => {


    return res.send("Hi");


};

const Saymynamecontroller = (req, res) => {

    const { name } = req.body;
    return res.send(`Hi ${name}`);

};

export { SayHicontroller, Saymynamecontroller };
