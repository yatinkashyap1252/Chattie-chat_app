import { Link as LinkComponent } from 'react-router-dom'
import { styled } from "@mui/material";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  width: 1,
  whiteSpace: 'nowrap',
  position: 'absolute',
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  height: 1,
  clip: 'rect(0 0 0 0)',
});

export const Link = styled(LinkComponent)`{
  textdecoration:none;
  color:black;
  padding:1rem;
  &:hover{
    backgroundcolor:#f0f0f0;
  }
}`

export const InputBox = styled('input')`
  width:100%;
  height:100%;
  border:none;
  outline:none;
  padding:0 1rem;
  border-radius:1.5rem;
  background-color:rgb(158 103 255);
`;

export const SearchField=styled("input")`
  padding:1rem 2rem;
  width:20vmax;
  height:45px;
  border:none;
  outline:none;
  border-radius:1.5rem;
  background-color:#f1f1f1;
  font-size:1.1rem;
`;

export const CurvedButton=styled("button")`
  border-radius:1.5rem;
  padding:0 2rem;
  outline:none;
  border:none;
  height:45px;
  background-color:black;
  color:white;
  font-size:1.1rem;
  &:hover{
    background-color:rgba(0,0,0,0.8);
  }
`;