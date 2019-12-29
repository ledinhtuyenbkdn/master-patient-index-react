import React from "react";
import {makeStyles} from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        marginTop: 10,
        marginBottom: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function MasterPersonDetails(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                    Định danh
                </Typography>
                <Typography variant="body2" component="p">
                    GlobalId: {props.masterPerson.globalId}
                </Typography>
                <Typography variant="body2" component="p">
                    Họ và tên: {props.masterPerson.fullName}
                </Typography>
                <Typography variant="body2" component="p">
                    Số thẻ bảo hiểm y tế: {props.masterPerson.healthInsuranceNumber}
                </Typography>
                <Typography variant="body2" component="p">
                    Số chứng minh nhân dân: {props.masterPerson.identificationNumber}
                </Typography>
                <Typography variant="body2" component="p">
                    Địa chỉ: {props.masterPerson.address}
                </Typography>
                <Typography variant="body2" component="p">
                    Ngày sinh: {props.masterPerson.dateOfBirth}
                </Typography>
                <Typography variant="body2" component="p">
                    Giới tính: {props.masterPerson.gender}
                </Typography>
                <Typography variant="body2" component="p">
                    Tỉnh khai sinh: {props.masterPerson.province != null ? props.masterPerson.province.name : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MasterPersonDetails;