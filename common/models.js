module.exports={
	user: {
		name: { type: String },
		password: { type: String},
		enterPassword: { type: String},
		gender: { type: Boolean, default: true}
	},
	commodity:{
		shopName: String,
		goodName: String,
		size: String,
		color: String,
		imgSrc: String,
		price: Number,
		num: Number
	},
	cart:{
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
		cShopName: {type: String },
		cSize: {type: String },
		cColor: {type: String },
		cImgSrc: { type: String },
        cPrice: { type: String },
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    }
};