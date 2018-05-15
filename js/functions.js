(function(){

    function on(el, evt, sel, handler){
        el.addEventListener(evt, function(event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                t = t.parentNode;
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        let n, subjects = [], cum = 0, auxUV = 0, cumAux = 0;
            elem = document.querySelector('#mdlNum');
            mdlNum = M.Modal.getInstance(elem);
        
        mdlNum.open();
        frmNum.txtNum.focus();

        frmNum.addEventListener('submit', function(e){
            e.preventDefault();
            if(isNaN(frmNum.txtNum.value.trim())){
                M.toast({html: 'Ingrese un número', classes: 'red darken-1'});
                frmNum.txtNum.focus();
            }else if(parseInt(frmNum.txtNum.value.trim()) > 0){
                n = parseInt(frmNum.txtNum.value.trim());
                mainCont.innerHTML = "";
                frmNum.txtNum.value = "";
                mdlNum.close();

                let dataFrm = "<div class='col s12 row'>";
                for(let i = 0; i < n; i++){
                    dataFrm += `
                        <div class='col s5 ${i % 2 != 0 ? 'offset-s1 ' : ''}subjectCont'>
                            <h5 class='center cyan-text text-darken-2'>Materia N° ${i+1}</h5>
                            <div class='input-field col s12'>
                                <label for='txtName_${i}'>Materia</label>
                                <input type='text' name='txtName_${i}' id='txtName_${i}'/>
                            </div>
                            <div class='input-field col s12'>
                                <select name='cmbUV_${i}' id='cmbUV_${i}'>
                                    <option value='2'>2</option>                                
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                                <label for='cmbUV_${i}'>Unidades valorativas</label>
                            </div>
                            <div class='input-field col s12'>
                                <label for='txtGrade_${i}'>Nota</label>
                                <input type='text' name='txtGrade_${i}' id='txtGrade_${i}'/>
                            </div>
                        </div>
                    `;

                    dataFrm += i % 2 == 0 ? "" : "</div><div class='col s12 row'>";
                }

                dataFrm += "</div>"

                mainCont.innerHTML += `
                    ${dataFrm}
                    <div class='col s12 btn-cont'>
                        <a id='btnGrades' class='btn cyan darken-2 waves-effect waves-lighten'>Procesar</a>
                    </div>
                `;
                
                M.FormSelect.init(document.querySelectorAll('select'), {});

            }else{
                M.toast({html: 'Ingrese un número mayor a 0', classes: 'red darken-1'});
                frmNum.txtNum.focus();               
            }
        });

        on(document, 'click', '#btnGrades', function(e){
            subjects = [];

            for(let i = 0; i < n; i++){
                subjects.push({
                    name: document.querySelector(`#txtName_${i}`).value,
                    uv: parseInt(document.querySelector(`#cmbUV_${i}`).value),
                    grade: parseFloat(document.querySelector(`#txtGrade_${i}`).value)
                });
            }

            mainCont.innerHTML = `
                <div id='cumCont'></div><br><br>
                <h4 class='center cyan-text text-darken-2'>Detalle de materias</h4>
                <table id='tblGrades' class='center bordered'>
                    <thead class='cyan darken-2 white-text'>
                        <th>Nombre</th>
                        <th>UV</th>
                        <th>Nota</th>
                    </thead>
                    <tbody></tbody>
                </table>
            `;

            for(let i = 0; i < n; i++){
                document.querySelector('#tblGrades tbody').innerHTML += (`
                    <tr>
                        <td>${subjects[i].name}</td>
                        <td>${subjects[i].uv}</td>
                        <td>${subjects[i].grade}</td>
                    </tr>
                `);

                auxUV += subjects[i].uv;
                cumAux += (subjects[i].grade * subjects[i].uv);
            }

            cum = cumAux / auxUV;

            cumCont.innerHTML = `
                <h4 class='center cyan-text text-darken-2'>CUM</h4>
                <h6 class='center'><b>${cum.toFixed(2)}</b></h6>
            `;
        });
    });


})
();