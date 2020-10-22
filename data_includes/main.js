PennController.ResetPrefix(null); //Initiates PennController
var showProgressBar = false;
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Number_ENG/main/images/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Number_ENG/main/images_fillers/")

Sequence( "information", "survey", "identification", "recording_information", "initRecorder", "instruction", "prac", "exp_start", "exp_block1", "rest", "exp_block2", "send", "final" )

PennController.SetCounter( "setcounter" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait(getHtml("information").test.complete()
            .failure(getHtml("information").warn()))
)

newTrial( "survey" ,
    newHtml("questionnaire", "survey.html")
        .print()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait(getHtml("questionnaire").test.complete()
            .failure(getHtml("questionnaire").warn()))
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial( "identification" ,
    newText("<p>Below is your unique ID for this experiment.</p><p>Please take a note of it in case you need it as a reference.</p><p>Press <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newTextInput("inputID", GetURLParameter("id"))
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

newTrial("recording_information" ,
    newText("<p><strong>Important:</strong></p><p>You will hear audio descriptions during the experiment, so please adjust the sound volume to a comfortable level before starting the experiment.</p><p>Your responses will be audio recorded during the experiment. Please complete this experiment in a quiet place.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()    
)

InitiateRecorder("https://langprolab/pcibex/index.php", "Please grant expt.pcibex.net access to your microphone.").label("initRecorder")

Template(
    GetTable("instructions.csv")
        .setGroupColumn("list")
        ,variable =>
    newTrial( "instruction" ,
        newHtml("information", variable.insPage)
            .print()
        ,
        newButton("Continue")
            .settings.center()
            .print()
            .wait(getHtml("information").test.complete()
                .failure(getHtml("information").warn()))
  )
  .log( "ID"     , getVar("ID")    )
  )

Template(
    GetTable("prac.csv")
        .setGroupColumn("list"), variable =>
        newTrial( "prac" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newText("inst_read", "<p>Please read the sentence aloud, then click on the sentence to proceed.</p>")
                .settings.center()
                .print()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newText("<p>In this example, you could say:</p>")
                .settings.center()
                .print()
            ,
            newText(variable.target1)
                .bold()
                .settings.after(newText("&nbsp;OR&nbsp;"))
                .settings.after(newText(variable.target2).bold())
                .settings.center()
                .print()
            ,
            newText("<p>Feel free to vary your expressions.</p>")
                .settings.center()
                .print()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , getVar("ID") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
  .log( "TargetNumber" , variable.target_notional_num )
  .log( "CompetitorNumber" , variable.competitor_num )
  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )

newTrial("exp_start",
        newText("<p>This is the end of the instructions. Please click on <strong>Start</strong> to start the experiment.</p><p>No instructions or examples will be provided during the experiment.</p>")
            .settings.center()
            .print()
        ,
        newButton("Start")
            .settings.center()
            .print()
            .wait()
)
  
Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("list")
        .filter(variable => variable.order < 50)
        , variable =>
        newTrial( "exp_block1" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , getVar("ID") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
  .log( "TargetNumber" , variable.target_notional_num )
  .log( "CompetitorNumber" , variable.competitor_num )
  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )
  

newTrial( "rest" ,
  newText("<p>Now you can take a break (1-2 mins).</p><p>Press <strong>Continue</strong> when you are ready.</p>")
      .print()
  ,
  newButton("Continue")
      .settings.center()
      .print()
      .wait()
)

Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("list")
        .filter(variable => variable.order > 49)
        , variable =>
        newTrial( "exp_block2" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newImage("one", variable.firstDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            clear()
            ,
            newImage("two", variable.secondDisplay)
                .size(600,400)
                .css("padding", "10px")
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log( "ID"   , getVar("ID") )
  .log( "List" , variable.list )
  .log( "Item" , variable.item )
  .log( "Condition" , variable.condition )
  .log( "ExpTrials" , variable.expTrials )
  .log( "TargetNumber" , variable.target_notional_num )
  .log( "CompetitorNumber" , variable.competitor_num )
  .log( "Ambiguity" , variable.ambiguity )
  .log( "Sentence"  , variable.sentence )
  )

SendResults( "send" )

newTrial( "final" 
//  , newFunction("redirect", function(){ window.location = "https://app.prolific.co/submissions/complete?cc=36EDE175"; })
    ,
    newText("<p>Thank you very much for your participation!</p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you were asked to download a copy of the recordings on the last page, please send the file and your unique ID to <strong>shi.zhang[at]stir.ac.uk.</strong></p><p>Otherwise, please click on the link below to validate your participation.</p>")
        .settings.center()
        .print()
    ,
    newText("<p><a href='https://stirling.sona-systems.com/webstudy_credit.aspx?experiment_id=1903&credit_token=73dbad39838a446598271bf8fdf6da8b&survey_code="+GetURLParameter("id")+"' href='_blank'>Click here to validate your participation and finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please see below for a debriefing of this study.</p>")
        .settings.center()
        .print()
    ,
    newHtml("debriefing", "debrief.html")
        .print()
    ,
    newButton("void")
        .wait()
//  , getFunction("redirect").call()
)
