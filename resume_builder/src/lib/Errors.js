export function sessionError() {
  return Response.json(
    { message: "session expired please login again", success: false },
    { status: 501 }
  );
}

export function resumeIdError() {
  return Response.json(
    { message: "Please Select a resume template", success: false },
    { status: 501 }
  );
}

export function idError() {
  return Response.json(
    { message: "Unable to find details with given id", success: false },
    { status: 501 }
  );
}
