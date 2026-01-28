/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Stack, Typography } from "@mui/material";

const AboutPage = () => {
  console.log("ABOUTPAGE");
  const Title: string = "About this app";
  const Text: string = `This app identifies the optimal time for key activities by aligning them with human physiology, sleep stages, and scientific research. It analyzes sleep cycles, including deep and REM sleep, along with circadian rhythms and recovery patterns to understand when the body is most ready to wake, focus, perform, or rest. Instead of relying on fixed clock times, the app adapts recommendations to how the body naturally functions. The guidance is based on peer-reviewed research from sleep science, neuroscience, and chronobiology. By working with biological rhythms rather than against them, the app helps improve sleep quality, energy levels, focus, and overall recovery.`;
  const Research: string = `The article "Physiology, Sleep Stages" by Aakash K. Patel, Vamsi Reddy, Karlie R. Shumway, and John F. Araujo explains how human sleep is organized and regulated through distinct physiological stages. Sleep is divided into two main phases: non-rapid eye movement (NREM) sleep and rapid eye movement (REM) sleep. NREM sleep includes three stages—N1, N2, and N3—each defined by specific brain activity, muscle tone, and levels of consciousness. Over the course of a typical night, the body cycles through these stages approximately four to six times, with each cycle lasting about 90 minutes.
Stage N1 represents light, transitional sleep as brain activity slows. Stage N2 is a more stable sleep stage characterized by sleep spindles and K-complexes, which help maintain sleep. Stage N3, also known as slow-wave or deep sleep, features the slowest brain waves and is critical for physical restoration and recovery. REM sleep occurs later in the cycle and is marked by heightened brain activity, muscle paralysis, vivid dreaming, and an important role in memory consolidation and cognitive processing.
The authors also describe the neurochemical mechanisms that regulate sleep and wake transitions, highlighting how different neurotransmitter systems promote either arousal or sleep. They note that sleep architecture changes across the lifespan and can be influenced by aging, mental health conditions, neurological injury, and disruptions to circadian rhythms. Overall, the article emphasizes that sleep is a dynamic and essential physiological process, and that understanding sleep stages is fundamental to evaluating normal sleep function and sleep-related disorders.`;
  const Citation = "https://www.ncbi.nlm.nih.gov/books/NBK526132/";
  return (
    <>
      <Stack sx={{ bgcolor: "rgba(0,0,0,0.5)", textAlign: "justify" }}>
        <Typography variant="h3" textAlign={"center"}>
          {Title}
        </Typography>
        <Divider sx={{ mt: 5 }}></Divider>
        <Typography variant="body1" px={5}>
          {Text}
        </Typography>
        <Divider sx={{ mt: 5 }}></Divider>
        <Typography variant="body1" px={5}>
          {Research}
        </Typography>
        <Divider sx={{ mt: 5 }}></Divider>
        <Typography
          component={"a"}
          variant="body1"
          textAlign={"justify"}
          href="https://www.ncbi.nlm.nih.gov/books/NBK526132/"
          target="_blank" // opens in a new tab
          rel="noopener noreferrer" // security best practice
        >
          {Citation}
        </Typography>
      </Stack>
    </>
  );
};

export default AboutPage;
