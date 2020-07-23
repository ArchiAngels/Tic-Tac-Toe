let container_game = document.getElementsByClassName('wrap_all');
let wrap_game = document.getElementsByClassName('wrap_game');

let count = 0;
let game_finish = false;
let matrix_game = [];
let column ;
let rows ;
let obj = {};
let nobody = true;
let count_of_game = 1;
let history_about_game = {}
let last_winner = '';

events_container = () =>{
    container_game[0].addEventListener('mousemove',(e)=>{
        if(e.target.className.includes('area_for_click')){
            if(e.target.className.includes('clicked')){}
            else{
                if(game_finish){
                    e.target.innerHTML = '';
                }
                else{
                    e.target.innerHTML = `${count %2 == 0 ? current_symbl = 'X':current_symbl='0'}`;
                }
                
            }
        }
        else{
            for(let i =0; i< column; i++){
                for(let j = 0; j < rows;j++){
                    if(wrap_game[0].children[i].children[j].className.includes('clicked')){}
                    else{
                        wrap_game[0].children[i].children[j].innerHTML = '';
                    }
                }
            }
            
        }
    });
    container_game[0].addEventListener('click',(e)=>{
        if(game_finish){
            if(e.target.className.includes('continue')){
                refresh();
            }
            if(e.target.className.includes('Verify_who_win')){
                create_helper_left();
                create_cnv({mess:last_winner});
            }
        }
    
        else{
            if(e.target.className.includes('area_for_click')){
                if(e.target.className.includes('clicked')){}
                else{
                    count %2 == 0 ? current_symbl = 'X':current_symbl='0';
                    count++;
                    change_data_matrix(e.target,current_symbl);
                    e.target.classList.add('clicked');
                    e.target.innerHTML = `<p>${current_symbl}</p>`;
                    check_who_win();
                   
                }
            }
        }
        document.getElementsByClassName('Symbl')[0].innerHTML = `${count %2 == 0 ? current_symbl = 'X':current_symbl='0'}`;
    });
}

init();

check_who_win = () => {
    let down_tmp,up_tmp,row_tmp,column_tmp;
    down_tmp = '';
    up_tmp = '';
    for(let i = 0; i<matrix_game.length;i++){

        down_tmp += matrix_game[i][i];
        up_tmp += matrix_game[matrix_game.length - 1 - i][i];

        obj.dia_down = {
            direction:down_tmp,
            start_point:matrix_game.length - 1 - i
        };
        obj.dia_up = {
            direction:up_tmp,
            start_point:i
        };

        row_tmp = '';
        column_tmp = '';
        
            for(let j = 0; j<matrix_game[i].length;j++){
                row_tmp += matrix_game[i][j];
                column_tmp += matrix_game[j][i];
            }

        obj['row'+i] = {
            direction:row_tmp,
            start_row:i
            
        };
        obj['column'+i] = {
            direction:column_tmp,
            start_column:i
        };
        
    }
    for(let k in obj){
        if(obj[k].direction.includes('XXX')){
            
            last_winner = k;
            nobody = false;
            finish_game({mess:'Win X'});
        }
        if(obj[k].direction.includes('000')){
            
            nobody = false;
            last_winner = k;
            finish_game({mess:'Win 0'});
        }
       
    }
    if((count)%(column*rows) == 0 && nobody){
        finish_game({mess:'Nobody win'});
        last_winner = '';
    }
}
function init(){

    document.getElementsByClassName('Symbl')[0].innerHTML = `${count %2 == 0 ? current_symbl = 'X':current_symbl='0'}`;
    history_about_game['game'+count_of_game] = [];

    column = wrap_game[0].children.length;
    rows = wrap_game[0].children[0].children.length;

    for(let i = 0; i < column; i++){
       let tmp_arr = [];
       for(let j = 0; j < rows; j++){
           tmp_arr.push('empty');
       }
       matrix_game.push(tmp_arr);
    }

    events_container();
}


function change_data_matrix(item,elem){
    let coors = {
        x:0,
        y:0
    }
    for(let i = 0; i< item.parentElement.children.length;i++){
        if(item.parentElement.children[i] == item){
            coors.x = i;
        }
        if(item.parentElement.parentElement.children[i] == item.parentElement){
            coors.y = i;
        }
    }
    history_about_game['game'+count_of_game].push({wave:count,
        row:coors.x,
        column:coors.y});
    
    matrix_game[coors.y][coors.x] = elem;
}
function finish_game(option){
    last_winner!=''?draw_line_html():0;
    game_finish = true;
    document.getElementsByClassName('finis_text')[0].innerHTML = option.mess;

    for(let i = 0; i< column; i++){
        for(let j = 0; j < rows;j++){
            if(wrap_game[0].children[i].children[j].className.includes('clicked')){
            }
            else{
                wrap_game[0].children[i].children[j].style.opacity = '0';
            }
        }
    }

    setTimeout(()=>{
        document.getElementsByClassName('game_finish')[0].classList.remove('hide');        
    },800);
    function draw_line_html(){
        let html_children = `
        <div class="canvas_wrap hide">
            <canvas class = 'canvas'></canvas>
        </div>`;
        wrap_game[0].innerHTML += (html_children);
        create_cnv({mess:last_winner});
        setTimeout(()=>{
            document.getElementsByClassName('canvas_wrap')[0].classList.remove('hide');
        },800);
    }
}
function refresh(){
    count = 0;
    obj = {};
    game_finish = false;
    last_winner = '';
    count_of_game++;
    history_about_game['game'+count_of_game] = [];
    nobody == false?document.getElementsByClassName('canvas_wrap')[0].classList.add('hide'):0;
    nobody == false?wrap_game[0].removeChild(wrap_game[0].children[wrap_game[0].children.length - 1]):0;
    nobody = true;
    document.getElementsByClassName('game_finish')[0].classList.add('hide');
    matrix_game = [];
    document.getElementsByClassName('Symbl')[0].innerHTML = `${count %2 == 0 ? current_symbl = 'X':current_symbl='0'}`;
    let column = wrap_game[0].children.length;
    let rows = wrap_game[0].children[0].children.length;
    for(let i = 0; i < column; i++){
       let tmp_arr = [];
       for(let j = 0; j < rows; j++){
           tmp_arr.push('empty');
           wrap_game[0].children[i].children[j].innerHTML = '';
           wrap_game[0].children[i].children[j].classList.remove('clicked');
           wrap_game[0].children[i].children[j].style.opacity = '1';
       }
       matrix_game.push(tmp_arr);
    }
}



// canvas
create_cnv = (options) =>{
    let cnv = document.getElementsByClassName('canvas');
    let ctx = cnv[0].getContext('2d');

    cnv[0].width = wrap_game[0].clientWidth;
    cnv[0].height = wrap_game[0].clientHeight;
    cnv[0].style.width = wrap_game[0].clientWidth +'px';
    cnv[0].style.height = wrap_game[0].clientHeight +'px';

    let start_point = +options.mess[options.mess.length - 1];
        start_point = start_point == 0?1:start_point == 1?3:start_point == 2?5:1;

        if(options.mess.includes('row')){
            draw_hui(0.165,0.165*start_point,0.85,0.165*start_point);
        }
        if(options.mess.includes('column')){
            draw_hui(0.165*start_point,0.165,0.165*start_point,0.85);
        }
        if(options.mess.includes('dia_down')){
            draw_hui(0.16,0.16,0.85,0.85);
        }
        if(options.mess.includes('dia_up')){
            draw_hui(0.16,0.85,0.85,0.16);
        }
        function draw_hui(x,y,x1,y1){
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.moveTo(x*cnv[0].width,y*cnv[0].height);
            ctx.lineTo(x1*cnv[0].width,y1*cnv[0].height);
            ctx.stroke();
        }
}
// Histroy of win

create_helper_left = () =>{
    let html = `
<div class = "helper_win">
    <div class ='wrap_result_helper'>
        <div class = 'wrap_result_hard'>`;
     for(let k in history_about_game){

        html += `
        <ol class ='custom_ol_game'>
        <p class = 'header_ol'>${k}</p>`;

        for(let i = 0; i < history_about_game[k].length;i++){
            html += `
            <li class = 'custom_li_hide'>X :${history_about_game[k][i].row} Y :${history_about_game[k][i].column}</li>`;
        }        
        html += `
        </ol>`;
    }

    html += `
            <p class = 'header_ol'>Exit</p>
        </div>
    </div>
    <div class = "Example_wave">
        <div class = 'wrap_game_example'>
            <div class = 'row_game_example'>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
            </div>
            <div class = 'row_game_example'>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
            </div>
            <div class = 'row_game_example'>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
                <div class="area_for_example"></div>
            </div>
        </div>
    </div>
</div>`;
    document.body.innerHTML += html;
    events_container();

    document.getElementsByClassName('helper_win')[0].addEventListener('click',(e)=>{
        if(e.target.innerText == 'Exit'){
            exit_helper_form();
        }
        else{
            if(e.target.className.includes('header_ol')){
                clear_example_area();
                for(let i = 1; i < e.target.parentElement.children.length;i++){
                    if(e.target.parentElement.children[i].className.includes('custom_li_hide')){
                        e.target.parentElement.children[i].classList.remove('custom_li_hide');
                        e.target.parentElement.children[i].classList.add('custom_li');
                    }
                    else{
                        e.target.parentElement.children[i].classList.add('custom_li_hide');
                        e.target.parentElement.children[i].classList.remove('custom_li');
                    }
                }
            }
            else{}
        }
    });

    document.getElementsByClassName('wrap_result_helper')[0].addEventListener('mousemove',(e)=>{
        if(e.target.className.includes('custom_li')){
            clear_example_area();
            for(let i =0; i < e.target.parentElement.children.length;i++){
                if(e.target.parentElement.children[i] == e.target){break;}
                let game_info = history_about_game[`${e.target.parentElement.children[0].innerHTML}`][i];
                i%2 == 0?only_example(game_info.column,game_info.row,'X'):only_example(game_info.column,game_info.row,'0');
            }
        }
        if(e.target.className.includes('header_ol')){
            clear_example_area();
        }
    });

    only_example = (column,row,symbl) =>{
        document.getElementsByClassName('Example_wave')[0].children[0].children[column].children[row].innerHTML = symbl;
    }

    clear_example_area = () =>{
        for(let i=0; i<column;i++){
            for(let j = 0; j < rows; j++){
                document.getElementsByClassName('Example_wave')[0].children[0].children[i].children[j].innerHTML = '';
            }
        }
    }

    exit_helper_form = () =>{
        document.body.removeChild(document.body.children[document.body.children.length - 1]);
    }
}