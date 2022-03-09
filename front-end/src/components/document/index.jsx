import React, {useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Switch from '@mui/material/Switch';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Documents=(props)=>{
    const navigate = useNavigate();
    const $token=localStorage.getItem('access_token');
    const [openAdd, setOpenAdd] =useState(false);
    const [openEdit, setOpenEdit] =useState(false);
    const [checked, setChecked] = React.useState(true);
    const [folders, setFolders]= useState([]);
    const [render, setRender] = useState(false);
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const clickOpenAdd=()=>{
        setOpenAdd(!openAdd);
    }
    const clickOpenEdit=()=>{
        setOpenEdit(!openEdit);
    }
    const onChangeShare = (id) => {
        fetch(process.env.REACT_APP_API+"/document/changeShare/"+id, {
            method: "POST",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            if(data.error){
                toast.error('Share failed.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
      
            }
            else{
                setRender(!render)
                toast.success('Share successfully.', {
                 position: "bottom-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "colored"
             });
            }
        });
        };
    const getDocuments = () =>{
        fetch(process.env.REACT_APP_API+'/document/getAllFolder', {
            method: "GET",
            headers: {"Authorization": `Bearer `+$token}
          })
        .then(response => response.json())
        .then(data =>  {
            setFolders(data.data.reverse());
        });
    }
    useEffect(() => {
        if($token){
           getDocuments();
        }else{
           navigate('/home');
        }
    }, [render])
    return(
        <Box 
            sx={{
                maxWidth:"100%",
                height:'100%',
                border:"1px solid rgb(227, 235, 241)",
                borderRadius:"5px",
                backgroundColor:"white"
            }}
        >
        <Modal
            open={openAdd}
            onClose={()=>clickOpenAdd()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80%",
                    height:"70%",
                    bgcolor: 'background.paper',
                    border: '2px solid #ff9900',
                    boxShadow: 24,
                    p: 4,
                    borderRadius:"10px"
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={8} md={12}>
                    <Typography 
                         sx={{ 
                            fontWeight:"bold",
                            color:"rgb(35, 54, 78)"
                        }} 
                        variant="h6"
                    >
                        New Folder
                    </Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                    <TextField
                        helperText={error.name?error.name[0]:null}
                        error={error.name?true:false}
                        id="name"
                        name="name"
                        label="Name *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        onChange={(event) => onChangeAddFolders(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Description"
                            name="description"
                            onChange={(event) => onChangeAddFolders(event)}
                            style={{ width: "100%",border:"1px solid rgb(200, 200, 200)",borderRadius:"5px",paddingTop:"5px",paddingLeft:"10px" }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
                        <Button 
                            type="submit"
                            onClick={(event) => onAddDocuments(event)}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"#FFFF66", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Publish
                        </Button>
                    </Grid> 
                    <Grid item xs={4} sm={8} md={2}>
                        <Button 
                            type="submit"
                            onClick={()=>clickOpenAdd()}
                            //onClick={(event) => onAddNews(event)}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"rgb(204, 204, 204)", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Cancel
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        </Modal>
        <Modal
            open={openEdit}
            onClose={()=>clickOpenEdit()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80%",
                    height:"70%",
                    bgcolor: 'background.paper',
                    border: '2px solid #ff9900',
                    boxShadow: 24,
                    p: 4,
                    borderRadius:"10px"
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={4} sm={8} md={12}>
                    <Typography 
                         sx={{ 
                            fontWeight:"bold",
                            color:"rgb(35, 54, 78)"
                        }} 
                        variant="h6"
                    >
                        Edit Folder
                    </Typography>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                    <TextField
                        //helperText={error.title?error.title[0]:null}
                        //error={error.title?true:false}
                        id="name"
                        name="name"
                        label="Name *"
                        variant="outlined"
                        size='small'
                        type={'text'}
                        sx={{marginTop:'5px',width:"100%"}}
                        InputLabelProps={{ shrink: true}}
                        //onChange={(event) => onChangeAddNews(event)}
                    />
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Description"
                            style={{ width: "100%",border:"1px solid rgb(200, 200, 200)",borderRadius:"5px",paddingTop:"5px",paddingLeft:"10px" }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
                        <Button 
                            type="submit"
                            //onClick={(event) => onAddNews(event)}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"#FFFF66", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Publish
                        </Button>
                    </Grid> 
                    <Grid item xs={4} sm={8} md={2}>
                        <Button 
                            type="submit"
                            onClick={()=>clickOpenEdit()}
                            sx={{
                                height:40.5,
                                width:"100%",
                                border:"1px solid #ff9900",
                                backgroundColor:"rgb(204, 204, 204)", 
                                color:"#ff9900"
                            }}
                            size='medium' 
                        >
                            Cancel
                        </Button>
                    </Grid> 
                </Grid>
            </Box>
        </Modal>
            <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
            >
                    <Grid item xs={4} sm={8} md={12}>
                        <Box
                            sx={{
                                borderBottom:"1px solid rgb(227, 235, 241)",
                                padding:"20px"
                            }}
                        >
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                            <Grid item xs={4} sm={3} md={4}>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search By Name ...."
                                        inputProps={{ 'aria-label': 'search by name...' }}
                                    />
                                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={2} md={5}></Grid>
                            <Grid item xs={4} sm={3} md={3}>
                                <Button 
                                    type="submit"
                                    onClick={(event) => clickOpenAdd(event)}
                                    sx={{
                                        height:40.5,
                                        width:"100%",
                                        border:"1px solid #ff9900",
                                        backgroundColor:"#FFFF66", 
                                        color:"#ff9900"
                                    }}
                                    size='medium' 
                                >
                                    <AddIcon/>  New Folder
                                </Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4} sm={8} md={12}>
                        <Box
                            sx={{
                                padding:"20px"
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Name</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Created By</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Created Date</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Description</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Share</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}}>Number Of Files</TableCell>
                                            <TableCell sx={{fontWeight:"bold",fontSize:"16px",color:"rgb(101, 114, 131)"}} align="center"><SettingsOutlinedIcon /></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {folders.length?
                                         folders.map((item,index)=>{
                                             return(
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {/* <Link to={`view/${props.data.id}`} style={{ textDecoration: 'none' }}> */}
                                                    <Link to={`view/3`} style={{ color:"rgba(0, 0, 0, 0.87)",textDecoration: 'none' }}>
                                                        <FolderIcon sx={{color:"rgb(79, 94, 113)"}} /> {item.name?item.name:"-"}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="right">{item.author?item.author:"-"}</TableCell>
                                                <TableCell align="right">{item.created_at?new Intl.DateTimeFormat('de-DE', { 
                                                    year: 'numeric', month: 'long', day: 'numeric' 
                                                }).format(new Date(item.created_at)):"-"}</TableCell>
                                                <TableCell align="right">{item.description?item.description:"-"}</TableCell>
                                                <TableCell align="right">
                                                    <Switch
                                                        defaultChecked={item.share===1?true:false}
                                                        onChange={()=>onChangeShare(item.id)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">{item.sum?item.sum:0}</TableCell>
                                                <TableCell>
                                                    <Grid
                                                        container
                                                        spacing={{ xs: 2, md: 3 }}
                                                        columns={{ xs: 4, sm: 8, md: 12 }}
                                                    >
                                                        <Grid item xs={2} sm={4} md={6}>
                                                            <Box
                                                                onClick={()=>clickOpenEdit()}
                                                                sx={{
                                                                    backgroundColor:"rgb(224, 230, 234)",
                                                                    padding:"5px",
                                                                    borderRadius:"3px",
                                                                    float:"right"
                                                                }}
                                                            >
                                                                <ModeEditOutlineOutlinedIcon sx={{color:"blue"}}  />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={2} sm={4} md={6}>
                                                            <Box
                                                                sx={{
                                                                    backgroundColor:"rgb(224, 230, 234)",
                                                                    float:"left",
                                                                    padding:"5px",
                                                                    borderRadius:"3px",
                                                                }}
                                                            >
                                                                <DeleteOutlinedIcon sx={{color:"red"}}  />
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                             )
                                            }
                                            ):null
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
            </Grid>
        </Box>
    );
}
export default Documents;