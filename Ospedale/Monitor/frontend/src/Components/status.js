import React, { Component } from "react";

class Status extends Component {

    componentDidMount = async() => {
        setInterval(async() => {
            await this.waitJson();
        },3000);
    }

    state = {
        dolore : 0,
        frequenzaCardiaca : 0,
        frequenzaRespiratoria : 0,
        pressioneArteriosa : 0,
        saturazioneOssigeno : 0,
        statoDiCoscienza : 0,
        bool : false,
    }

    waitJson = async() => {
        let i = 1;
        let path = window.location.pathname;
        let id_paziente = path.split('/')[2];
        let res = await fetch(`http://79.50.75.82:5000/readstatus/${id_paziente}`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        if(res.ok){
            let result = await res.json();
            this.setState({
                dolore : result["Dolore "],
                frequenzaCardiaca : result["Frequenza Cardiaca "],
                frequenzaRespiratoria : result["Frequenza Respiratoria "],
                pressioneArteriosa : result["Pressione Arteriosa "],
                saturazioneOssigeno : result["Saturazione Ossigeno "],
                statoDiCoscienza : result["Stato di Coscienza "]    
            })
        }else {
            let result = await res.json();
            console.log("Failed");
            throw result;
        }
        
        //this.setState({parameters : result});

        //download file sent by server

        /*fetch('http://localhost:3000/esempio', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));

            const link = document.createElement('a');
            link.href = url;
            link.download = "response.json";

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);
        });*/




    }
    render () {
            
        
        return(
            <>
            <h1 style={{display : "flex", justifyContent : "center",fontSize : "60px"}}>Status paziente {window.location.pathname.split('/')[2].split('te')[1]}</h1>

            <div style={{display : "flex",justifyContent : "center",
             alignItems : "center",flexDirection : "column",
             position : "absolute", top : "30%", left : "15%"}}>
                {this.state.pressioneArteriosa<=30 && this.state.pressioneArteriosa!=0 ? (
                    <>
                        <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Pressione Arteriosa</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.pressioneArteriosa}</p></button>
                        </div>
                    </>
                ):(
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Pressione Arteriosa</b></label>
                        <p>{this.state.pressioneArteriosa}</p>
                    </div>
                    </>
                )}
                
                <br></br><br></br>
                {this.state.frequenzaCardiaca<=30 && this.state.frequenzaCardiaca != 0 ? (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Frequenza Cardiaca</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.frequenzaCardiaca}</p></button>
                    </div>
                    </>
                ): (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><b>Frequenza Cardiaca</b></label>
                        <p>{this.state.frequenzaCardiaca}</p>
                    </div>
                    </>
                )}
                <br></br><br></br>
                {this.state.frequenzaRespiratoria<=30 && this.state.frequenzaRespiratoria!=0 ? (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Frequenza Respiratoria</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.frequenzaRespiratoria}</p></button>
                    </div>
                    </>
                ): (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><b>Frequenza Respiratoria</b></label>
                        <p>{this.state.frequenzaRespiratoria}</p>
                    </div>
                    </>
                )}
                <br></br><br></br>
            </div>
            <div style={{display : "flex",justifyContent : "center",
             alignItems : "center",flexDirection : "column",
             position : "absolute", top : "30%", left : "70%"}}>
                {this.state.saturazioneOssigeno<=30 && this.state.saturazioneOssigeno != 0 ? (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Saturazione Ossigeno</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.saturazioneOssigeno}</p></button>
                    </div>
                    </>
                ):(
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Saturazione Ossigeno</b></label>
                        <p>{this.state.saturazioneOssigeno}</p>
                    </div>
                    </>
                )}
                <br></br><br></br>
                {this.state.statoDiCoscienza <=30 && this.state.statoDiCoscienza!=0 ? (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Stato di Coscienza</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.statoDiCoscienza}</p></button>
                    </div>
                    </>
                ): (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><b>Stato di Coscienza</b></label>
                        <p>{this.state.statoDiCoscienza}</p>
                    </div>
                    </>
                )}
                <br></br><br></br>
                {this.state.dolore<=30 && this.state.dolore!=0 ? (
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputEmail1" class="form-label"><b>Dolore</b></label>
                        <br></br>
                        <button type="button" class="btn btn-danger" width="100vh"><p>{this.state.dolore}</p></button>
                    </div>
                    </>
                ):(
                    <>
                    <div style={{width : "300px",textAlign : "center",fontSize : "20px"}} class="mb-3">
                        <label for="exampleInputPassword1" class="form-label"><b>Dolore</b></label>
                        <p>{this.state.dolore}</p>
                    </div>
                    </>
                )}
                <div>
                </div>
            </div>
            </>
        );
    }
}

export default Status;