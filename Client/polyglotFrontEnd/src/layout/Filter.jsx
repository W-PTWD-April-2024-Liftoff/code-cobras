import React,{ useState, useEffect  } from 'react';
import { consonant_data } from '../data/ConsonantTableScript';
import { vowel_data } from '../data/vowelTableScript';



export default function Filter(props) {



        const [options, setOptions] = useState([]);
        const [selectedValue, setSelectedValue] = useState(null);

        const [syllableLengths,setSyllableLengths] = useState([0,1,2,3]);


        const [consonant, setConsonant] = useState(props.filters.consonant);
        const [vowel, setVowel] = useState(props.filters.vowel);
        const [language, setLanguage] = useState(props.filters.language);

        const [codaLength, setCodaLength] = useState(props.filters.codaLength);
        const [onsetLength, setOnsetLength] = useState(props.filters.onsetLength);
        const [requiredCodaLength, setRequiredCodaLength] = useState(props.filters.requiredCodaLength);
        const [requiredOnsetLength, setRequiredOnsetLength] = useState(props.filters.requiredOnsetLength);

        const handleChange = (e) => {
          //setSelectedValue(e.target.value);
          const { name, value } = e.target;
          if (name === "consonant") {
            setConsonant(value);
          } else if (name === "vowel") {
            setVowel(value);
          } else if (name === "language") {
            setLanguage(value);
          } else if (name === "codaLength") {
            setCodaLength(value);
          } else if (name === "onsetLength") {
            setOnsetLength(value);
          } else if (name === "requiredCodaLength") {
            setRequiredCodaLength(value);
          } else if (name === "requiredOnsetLength") {
            setRequiredOnsetLength(value);
          }
        };

        const handleSubmit = (e) => {
          props.onValuesChange({ consonant: consonant, vowel: vowel, language: language, codaLength: codaLength, onsetLength: onsetLength, requiredCodaLength: requiredCodaLength, requiredOnsetLength: requiredOnsetLength });
          e.preventDefault();
          
        };        

    return (
        // <div className="offcanvas-lg offcanvas-start sticky-left" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
        //     <h1>Filter will exist here</h1>
        //     <ul>
        //         <li>Filter item 1 </li>
        //         <li>Filter item 2</li>
        //         <li>Filter item 3</li>
        //         <li>Filter item 4</li>
        //     </ul>
        // </div>
        <div className="offcanvas-lg offcanvas-start sticky-left" id="bdSidebar" aria-labelledby="bdSidebarOffcanvasLabel">
        {/* <table style={{width:'100%'}}> */}
            {/* <tr><th>header1</th><th></th><th>header2</th></tr> */}
            {/* <tr key="0"><td style={{width:'100%',  verticalAlign:'top'}}> */}
                    <h4>Search:</h4>
                    <form onSubmit={handleSubmit}>                    
        <table className="table table-secondary table-borderless">
          <tbody>
          <tr><td>
                  Consonant: </td>
                  <td><select className="form-select  form-select-sm" name="consonant" value={consonant} onChange={handleChange}>
                <option value="" >Select</option>
                {consonant_data.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
          </td></tr>
          <tr><td>
                  Vowel: </td>
                  <td><select className="form-select form-select-sm" name="vowel" value={vowel} onChange={handleChange}>
                <option value="" >Select</option>
                {vowel_data.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </td></tr>

            <tr><td>
                  Language: </td>
                  <td><select className="form-select form-select-sm" name="language" value={language} onChange={handleChange}>
                <option value="" >Select</option>
                {props.languages.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              
            </td></tr>    

            <tr><td>
                  Coda length: </td>
                  <td><select className="form-select form-select-sm" name="codaLength" value={codaLength} onChange={handleChange}>
                <option value="" >Select</option>
                {syllableLengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
            </td></tr> 

            <tr><td>
                  Onset length: </td>
                  <td><select className="form-select form-select-sm" name="onsetLength" value={onsetLength} onChange={handleChange}>
                <option value="" >Select</option>
                {syllableLengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
            </td></tr>  

            <tr><td>
                  Required Coda length: </td>
                  <td><select className="form-select form-select-sm" name="requiredCodaLength" value={requiredCodaLength} onChange={handleChange}>
                <option value="" >Select</option>
                {syllableLengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
            </td></tr>

                        <tr><td>
                  Required Onset length: </td>
                  <td><select className="form-select form-select-sm" name="requiredOnsetLength" value={requiredOnsetLength} onChange={handleChange}>
                <option value="" >Select</option>
                {syllableLengths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
            </td></tr>                                     
           <tr><td colSpan="2"><button className='btn btn-primary' type="submit">Filter</button></td></tr>
           </tbody>
        </table>
        </form>



                {/* </td>
                <td style={{width:'1%'}}></td>
                <td style={{width:'79%' , border:'1px solid grey', height:'300px'}}> */}
                    
                    {/* </td></tr> */}
        {/* </table> */}
        </div>
    )
}