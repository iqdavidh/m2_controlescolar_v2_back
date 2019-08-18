'use strict';

/**
 * Created by David on 18/07/2019.
 */

const BuilderJsonResponse = {

	Success: (res, dataResponse, msg = '') => {

		let data = {
			success: true,
			msg: msg,
			data: dataResponse
		};

		res.status(200).json(data);
	},
	Error: (res, error, code = 500) => {
		let data = {
			success: false,
			msg: error
		};
		res.status(code).json(data);
	}

};

module.exports = BuilderJsonResponse;
