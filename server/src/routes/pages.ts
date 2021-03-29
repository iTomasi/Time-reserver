import {Router} from "express";
const router = Router();

let hours_list: any = [];
let validation = true;

router.get("/", (req, res) => {
    if (validation) {
        let theId = 1;
        let quotes = 7;
        for (let i = 8; i < 20; i++) {
            hours_list = [...hours_list, {
                id: theId,
                hour: `${("0" + i).slice(-2)}:00 Hrs`,
                quotes
            }, {
                id: ++theId,
                hour: `${("0" + i).slice(-2)}:30 Hrs`,
                quotes
            }]

            ++theId
        }
        validation = false;
    }

    else {
        console.log("XDLOL")
    }

    res.json({list: hours_list})
});


router.put("/updating-list/:id", (req, res) => {
    const id = req.params.id;
    const {msg} = req.body;

    if (!msg) return console.log("Q a pasao")

    try {
        const findArrayIndex = hours_list.findIndex((element: any) => element.id == id);

        if (msg === "available" && hours_list[findArrayIndex].quotes > 0) {
            --hours_list[findArrayIndex].quotes
        }

        else if (msg === "taken" && hours_list[findArrayIndex].quotes < 7) {
            ++hours_list[findArrayIndex].quotes
        }

        else if (msg === "taken-full" && hours_list[findArrayIndex].quotes === 0) {
            ++hours_list[findArrayIndex].quotes
        }

        return res.json({list: hours_list})
    }

    catch(e) {
        console.log("xD")
    }
    
})

export default router;