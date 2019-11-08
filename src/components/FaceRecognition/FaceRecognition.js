import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
	return(
	<div className='center'>
		<div className='absolute mt4'>
			<img id='inputimage' alt='' className='br3' src={imageUrl} width='500px' heigh='auto'/>
			<div className='faceBox' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
		</div>
	</div>
		);
}

export default FaceRecognition;