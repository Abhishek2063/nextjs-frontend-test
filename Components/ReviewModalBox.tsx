import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ReviewModalBoxProps } from '@/types/product';



const ReviewModalBox: React.FC<ReviewModalBoxProps> = ({ handleClose, open, title, reviews }) => {
    return (
        <React.Fragment>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="md">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {reviews.map((review: any, index: number) => (
                        <div key={index} className="my-4">
                            <Typography variant="h6" gutterBottom>
                                {review?.reviewerName} ({review?.rating}/5)
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {new Date(review?.date).toLocaleDateString()} - {review?.reviewerEmail}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {review?.comment}
                            </Typography>
                            {index < reviews.length - 1 && <Divider className="my-2" />}
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="bg-blue-500 text-white">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ReviewModalBox;
