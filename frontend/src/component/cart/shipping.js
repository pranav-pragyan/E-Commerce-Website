import React,{Fragment,useState}  from 'react';
import "./shipping.css";
import {useDispatch,useSelector} from "react-redux";
import {saveShippingInfo} from "../../action/cartAction";
import MetaData from "../../component/Layout/metadata";
import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State} from "country-state-city";
import CheckoutSteps from "../cart/checkoutSteps";
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {shippingInfo} = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingInfo.landmark);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pincode, setPinCode] = useState(shippingInfo.pincode);
  const [phoneno, setPhoneno] = useState(shippingInfo.phoneno);

  const shippingSubmit = (e) =>{
      e.preventDefault();
      if(phoneno.length>10 || phoneno.length<10)
      {
        alert("Invalid Phone Number");
        return;
      }
      dispatch(saveShippingInfo({address,city,state,country,pincode,phoneno}))
      navigate("/order/confirm");
  }

  return (
    <Fragment>
      <MetaData title="Shipping Detail"/>
      <CheckoutSteps activeStep={0}/>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className='shippingHeading'>Shipping Details</h2>
          <form className="shippingForm" encType='multipart/form-data' onSubmit={shippingSubmit} >

              <div>
                <HomeIcon/>
                <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)}/>
              </div>

              <div>
                <LocationCityIcon/>
                <input type="text" placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>

              <div>
                <PinDropIcon/>
                <input type="number" placeholder='Pin Code' required value={pincode} onChange={(e) => setPinCode(e.target.value)}/>
              </div>

              <div>
                <PhoneIcon/>
                <input type="number" placeholder='Phone Number' required value={phoneno} onChange={(e) => setPhoneno(e.target.value)}/>
              </div>

              <div>
                <PublicIcon/>
                <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
                  <option value="">Country</option>
                  {Country && Country.getAllCountries().map((item) =>(
                    <option key={item.isoCode} value={item.isoCode} defaultValue="India" >{item.name}</option>
                  ))}
                </select>
              </div>

              {country && (
                <div>
                    <TransferWithinAStationIcon/>
                    <select required value={state} onChange={(e)=>setState(e.target.value)}>
                    <option value="">State</option>
                    {State && State.getStatesOfCountry(country).map((item)=>(
                      <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))}
                    </select>
                </div>
              )}

              <input type="submit" value="Continue" disabled={state ? false : true} className="shippingBtn" />
          </form>

        </div>
      </div>
    </Fragment> 
  )
}

export default Shipping