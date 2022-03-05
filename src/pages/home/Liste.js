import { List,ListItem,ListItemText,Divider,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useFirestore } from '../../hooks/useFirestore';

export default function Liste({belgeler}) {

     const {belgeSil} = useFirestore("belgeler")

    console.log(belgeler);
    return (
        <List>
            {belgeler.map((belge) => (
                <React.Fragment key={belge.id}>
                    <ListItem secondaryAction={
                        <IconButton onClick={()=>belgeSil(belge.id)} edge="end" aria-label="delete">
                        <DeleteIcon/>
                        </IconButton>
                    }>
                    <ListItemText primary={belge.baslik} secondary={belge.miktar} />
                    
                    </ListItem>
                    <Divider/>
                </React.Fragment>
                ))}
        </List>
    )
}