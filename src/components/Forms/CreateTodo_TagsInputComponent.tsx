import React, { useState, useEffect } from 'react';

// Reused from https://github.com/qreoct/tyea/blob/master/react-frontend/src/components/ModalNew_TagInput.js

interface TagsInputProps {
	onChange: (data: string[]) => void;
	submitted: boolean;
	setSubmitted: (isSubmitted: boolean) => void;
	onSubmit?: () => void;
}

const CreateTodo_TagsInputComponent = ({onChange, submitted, setSubmitted}: TagsInputProps) => {
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState<string>('');
  
	const removeTag = (i: number) => {
		const newTags = [ ...tags ];
		newTags.splice(i, 1);

		// Call the defined function setTags which will replace tags with the new value.
		setTags(newTags);
	};

	const handleAddTagViaKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const val = tagInput;
		if ((e.key === ' ' || e.key === 'Tab' ) && val) {
			e.preventDefault();
			if (valExistsInTags(val)) {
				return;
			}
			setTagInput('');
			setTags([...tags, val]);
		} else if (e.key === 'Backspace' && !val) {
			removeTag(tags.length - 1);
		} else if (e.key === 'Enter' && !val) {
			e.preventDefault();
		}
	};

	const handleAddTagViaButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		const val = tagInput;
		if (val) {
			e.preventDefault();
			if (valExistsInTags(val)) {
				return;
			}
			setTagInput('');
			setTags([...tags, val]);
		}
	};

	const valExistsInTags = (val: string): boolean => {
		return tags.find(tag => tag.toLowerCase() === val.toLowerCase()) != undefined;
	};

	useEffect(() => {
		onChange(tags); // send the tags to callback function of parent
	/*
	okay, so this throws the error "Cannot update a component (`App`) while rendering a different component"
	because apparently a child component should not do a render call
	to the parent element (via callback) IN THE function body of this
	child component.
 	*/
	}, [tags]);

	useEffect(() => {
		if(submitted){ setTags([]); setSubmitted(false); }

	}, [submitted, setSubmitted]);


	return (
		<div className='input-tag'>
			<ul>
				{ tags.map((tag, i) => (
					<li key={tag} className='input-tag__tags'>
						<span> {tag} </span>
						<button type="button" className='input-tag__remove-button button'
							onClick={() => { removeTag(i); }}>+</button>
					</li>
				))}
				<li>
					<input type="text" className='input--underlined typography--heavy'
						onKeyDown={handleAddTagViaKeyboard} 
						value={tagInput}
						onChange={(e) => setTagInput(e.target.value)}/>
				</li>
				<button type="button" className='button text-button--gray'
					onClick={(e) => handleAddTagViaButton(e)}> add tag </button>
			</ul>
		</div>
	);
};

export default CreateTodo_TagsInputComponent;