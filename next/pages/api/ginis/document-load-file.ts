import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'
import { parseString } from "xml2js"
import { RequestGinisBodyLoadFile, ResponseGinisBodyLoadFile } from 'dtos/ginis/api-data.dto'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline);


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void>  => {
  let result: ResponseGinisBodyLoadFile
  let buffer: Buffer
  const body: RequestGinisBodyLoadFile = req.body
  try {
    const axiosConfig: AxiosRequestConfig = {headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: 'http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0/Nacist-soubor',
    }}
    const xml = `
      <s:Envelope
        xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
        <s:Header>
          <o:Security s:mustUnderstand="1"
            xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <o:UsernameToken u:Id="uuid-ea5d8d3d-df90-4b69-b034-9026f34a3f21-1">
              <o:Username>${process.env.GINIS_USERNAME}</o:Username>
              <o:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${process.env.GINIS_PASSWORD}</o:Password>
            </o:UsernameToken>
          </o:Security>
        </s:Header>
        <s:Body>
          <Nacist-soubor
            xmlns="http://www.gordic.cz/svc/xrg-ude/v_1.0.0.0">
            <requestXml>
              <Xrg
                xmlns="http://www.gordic.cz/xrg/ude/nacist-soubor/request/v_1.0.0.0">
                <Nacist-soubor>
                  <Id-souboru>${body.fileId}</Id-souboru>
                </Nacist-soubor>
              </Xrg>
            </requestXml>
          </Nacist-soubor>
        </s:Body>
      </s:Envelope>
    `
    let response = {}
    const responseAxios = await axios.post(process.env.GINIS_URL, xml, axiosConfig).then(res=>{
      return res
    }).catch(err=> {return err})
    
    if(!responseAxios || responseAxios.status != 200) {
      return res.status(400).json({message: 'bad soap request to Ginis'})
    }
    parseString(responseAxios.data, { explicitArray: false }, function (error, r) {
      if (error) {
        return res.status(400).json({message: 'bad xml to json'})
      } else {
        response = r
      }
      
    })
    result = response["s:Envelope"]["s:Body"]["Nacist-souborResponse"]["Nacist-souborResult"]["Xrg"]["Nacist-soubor"]
    buffer = Buffer.from(result.Data, 'base64')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename=' + result["Jmeno-souboru"])
  } catch (e) {
    console.log(e)
  }
  
  res.send(buffer)
}