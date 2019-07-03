const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        title: {
            type: String
        },
        authors: [
            {
                type: String
            }
        ],
        link: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        saved: {
            type: Boolean,
            default: true
        },
        _id: {
            type: String
        }
        // notes: [
        //     {
        //         // Store ObjectIds in the array
        //         type: Schema.Types.ObjectId,
        //         // The ObjectIds will refer to the ids in the Note model
        //         ref: "note"
        //     }
        // ]
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = {
    Book: mongoose.model("book", DataSchema),
};
