import axios from 'axios';

// ./api/session/geAvailableSession
async function handler(req, res) {

    // res.status(200).json({ name: req.body, name: req.name });
    let { url } = req.body;
    console.log(url);
    try {
        const resp = await fetch('https://scrapperx.herokuapp.com/scrape/' + encodeURIComponent(url)).then((res) => res.json());
        if (resp["imgs"]) {
            let newData = [];
            resp["imgs"].map((value, index) => {
                newData = [...newData, {
                    image: value,
                }];
            })
            res.status(200).send(newData);
        }
        else
            res.status(500).send('Server Error');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export default handler;

/*
        const url = "http://www.osmschool.com";
        //const url = "https://squarepanda.com/";

        // const url = "https://squarepanda.com/";
        console.log('https://scrapperx.herokuapp.com/scrape/' + encodeURIComponent(url));
        const resp = await fetch('https://scrapperx.herokuapp.com/scrape/' + encodeURIComponent(url)).then((res) => res.json());
        console.log(resp);
        if (resp["imgs"]) {
            let newData = [];
            resp["imgs"].map((value, index) => {
                newData = [...newData, {
                    image: value,
                }];
            })
            setData(newData);
            setClicked(!clicked);
            console.log("newData", newData);

        }

*/