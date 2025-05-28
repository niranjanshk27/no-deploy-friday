import { getInput, setOutput, setFailed, info } from "@actions/core";
import { inAction } from "./action";

inAction({ getInput, setFailed, setOutput, logInfo: info });

// TODO:
// Add docs
// Add action yml
// Publish to github market
// Add workflow
