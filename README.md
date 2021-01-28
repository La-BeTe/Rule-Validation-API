# Rule-Validation-API

[![BuildStatus](https://travis-ci.com/La-BeTe/Rule-Validation-API.svg?branch=master)](https://travis-ci.com/La-BeTe/Rule-Validation-API)

Live API is available [here](https://lbt-rule-validation-api.herokuapp.com)

## **Endpoints**

### **Show My Details**

    Returns json data about me

-   **URL**
    -   /
-   **Method**
    -   `GET`
-   **Success Response**
    -   **Code:** 200
    -   **Content:**
    ```
    {
        message: "My Rule-Validation API.",
        status: "success",
        data: {
            name: [string],
            mobile: [string],
            github: [string],
            email: [string]
        }
    }
    ```
-   **Failure Response**
    -   **Code:** 500
    -   **Content:**
    ```
    {
        message: "Internal server error occurred.",
        status: "error",
        data: null
    }
    ```

### **Validate Rule**

    Validates data object based on given rules

-   **URL**
    -   /validate-rule
-   **Method**
    -   `POST`
-   **Data Params**
    -   **Required**
        -   `rule={field: [string], condition:[string], condition_value: [string | number]}`
        -   `data=[string | array | object]`
-   **Success Response**
    -   **Code:** 200
    -   **Content:**
    ```
    {
        message: "field [name of field] successfully validated.",
        status: "success",
        data: {
            validation: {
                error: false,
                field: [name of field],
                field_value: [value of field],
                condition: [rule condition],
                condition_value: [condition value]
            }
        }
    }
    ```
-   **Failure Response**
    -   **Code:** 400
    -   **Content:**
    ```
    {
        message: "[field] is required.",
        status: "error",
        data: null
    }
    ```
    **OR**
    -   **Code:** 400
    -   **Content:**
    ```
    {
        message: "[field] should be a/an [type].",
        status: "error",
        data: null
    }
    ```
    **OR**
    -   **Code:** 400
    -   **Content:**
    ```
    {
    message: "field [name of field] is missing from data.",
    status: "error",
    data: null
    }
    ```
    **OR**
    -   **Code:** 400
    -   **Content:**
    ```
    {
        message: "field [name of field] failed validation.",
        status: "error",
        data: {
            validation: {
                error: true,
                field: [name of field],
                field_value: [value of field],
                condition: [rule condition],
                condition_value: [condition value]
            }
        }
    }
    ```
    **OR**
    -   **Code:** 500
    -   **Content:**
    ```
    {
        message: "Internal server error occurred.",
        status: "error",
        data: null
    }
    ```
