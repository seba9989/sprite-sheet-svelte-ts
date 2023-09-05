export type animationObject = {
	lineNumber: number;
	length: number;
	nextAnimation: string | string[];
};

export type animationConfig = {
	start: string;

	fps: number;
	oneFrameSize: {
		x: number;
		y: number;
	};

	imgSize: {
		column: number;
		row: number;
	};

	src: string;

	animationList: Record<string, animationObject>;
};
