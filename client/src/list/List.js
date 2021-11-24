import { useState, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from '@mui/icons-material/Add';
import { SINGLE_TEXT, DOUBLE_TEXT, IMAGE, MEDIA } from './Templates';
import { Context } from '../Context';
import Graphic from './Graphic';

const GraphicList = ({ matches }) => {
    const { config, setConfig, live, selectedGraphic, setSelectedGraphicId, updateGraphic } = useContext(Context);
    const [anchorEl, setAnchorEl] = useState(null);

    const addGraphic = (graphicJSON) => {
        setAnchorEl(null);
        setConfig((prev) => [...prev, graphicJSON()]);
    };

    const hotkeys = (event) => {
        let index;
        switch(event.keyCode) {
            case 38:
                index = config.findIndex((item) => item.id === selectedGraphic?.id);
                if (index > 0) {
                    setSelectedGraphicId(config[index - 1].id);
                }
                break;
            case 40:
                index = config.findIndex((item) => item.id === selectedGraphic?.id);
                if (index < config.length - 1) {
                    setSelectedGraphicId(config[index + 1].id);
                }
                break;
            case 46:
                if (!live) {
                    index = config.findIndex((item) => item.id === selectedGraphic.id);
                    setConfig((prev) => prev.filter((graphic) => graphic.id !== selectedGraphic?.id));
                    setSelectedGraphicId(null);
                }
                break;
            case 113:
                updateGraphic(selectedGraphic.id, 'visible', !selectedGraphic.visible);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title='Add Graphic'>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                        <Add />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => addGraphic(SINGLE_TEXT)}>Single Text</MenuItem>
                    <MenuItem onClick={() => addGraphic(DOUBLE_TEXT)}>Double Text</MenuItem>
                    <MenuItem onClick={() => addGraphic(IMAGE)}>Image</MenuItem>
                    <MenuItem onClick={() => addGraphic(MEDIA)}>Media</MenuItem>
                </Menu>
            </Toolbar>
            <Divider />
            <List sx={{ height: 'calc(100% - 64px)', overflow: 'auto' }} disablePadding onKeyDown={hotkeys}>
                {config?.map((graphic, index) => (
                    <Graphic
                        key={graphic.id}
                        id={graphic.id}
                        name={graphic.name}
                        visible={graphic.visible}
                        selected={graphic.id === selectedGraphic?.id}
                        onSelect={setSelectedGraphicId}
                        updateGraphic={updateGraphic}
                    />
                ))}
            </List>
        </>
    );
};

export default GraphicList;