import { client as prismicClient } from './prismic';

export interface Steps {
  id: string;
  data: {
    step_number: number;
    title: string;
    description: [];
    image: [];
  };
}

export async function getAllWorkflowSteps() {
  try {
    let steps = await prismicClient.getAllByType('workflow_steps');

    if (steps) {
      steps = steps.sort((a, b) => a.data.step_number - b.data.step_number);
    }

    return {
      steps: steps ? steps : [],
    };
  } catch (error) {
    console.error('getAllWorkflowSteps -> error', error);
    return error;
  }
}
