import React from 'react';

interface pictureSkittleProps {
	img_url?: string,
	data: string,
	size?: string
}

const PictureSkittle = (props: pictureSkittleProps) => {

	const colors:string[] = [
		'pink', 'violet', 'blue', 'teal', 'lime', 'orange', 'red', 'grape', 'indigo', 'cyan','green', 'yellow'
	];

	function getColorFromName(name: string):string {
		const firstAlphabet = name.charAt(0).toLowerCase();
		const asciiCode = firstAlphabet.charCodeAt(0);
		const index = asciiCode % colors.length;
		return colors[index];
	}

	const size = props.size == 'large' ? 'picture-skittle--large' : '';

	return (
		<div className={`picture-skittle ${size} shadow`} style={{backgroundColor:`var(--oc-${getColorFromName(props.data)}-5)`}}>
			{props.img_url && <span> image </span>}
			<span title={props.data}> {props.data.charAt(0).toUpperCase()} </span>
		</div>
	);

};

export default PictureSkittle;