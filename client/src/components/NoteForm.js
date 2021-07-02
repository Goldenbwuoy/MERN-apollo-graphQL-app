import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
	height: 100%;
`;

const Form = styled.form`
	height: 100%;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 80%;
`;

const NoteForm = ({ content, action }) => {
	const [value, setValue] = useState({ content: content || "" });

	const onChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value });
	};
	return (
		<Wrapper>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					action({
						variables: {
							...value,
						},
					});
				}}
			>
				<TextArea
					required
					type="text"
					name="content"
					placeholder="Note content"
					value={value.content}
					onChange={onChange}
				/>
				<Button type="submit">Save</Button>
			</Form>
		</Wrapper>
	);
};

export default NoteForm;
