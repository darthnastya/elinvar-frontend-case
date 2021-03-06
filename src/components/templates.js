import React from 'react'
import { Button, Icon, Message, Label } from 'semantic-ui-react'
import classNames from 'classnames'

const composedTypes = ['object', 'array']
const distinctComposedType = type => composedTypes.includes(type)

export function FieldTemplate(props) {
  const Template = distinctComposedType(props.schema.type)
    ? ComposedFieldTemplate
    : PrimitiveFieldTemplate
  return <Template {...props} />
}

function ComposedFieldTemplate(props) {
  const { classNames } = props
  return (
    <div className={classNames}>
      <div className="field-heading">
        <h3>{props.label}</h3>
        <FieldHelper {...props} />
      </div>
      {props.children}
    </div>
  )
}

function PrimitiveFieldTemplate(props) {
  const { uiSchema } = props
  const widget = uiSchema['ui:widget']
  const className = classNames(
    props.classNames,
    widget && `widget-${widget}`
  )
  return (
    <div className={className}>
      <label>
        {props.required && '*'}
      </label>
      <div className="ui input form fluid">{props.children}</div>
      <FieldHelper {...props} />
    </div>
  )
}

function FieldErrors({ errors }) {
  if (!errors || !errors.length) return null
  return <div className="field-errors">
    {errors.map((err, i) => <Label key={i} color='red' pointing>  rawDescriptionLog </Label>)}
  </div>
}

function FieldHelper(props) {
  const { rawDescription, rawErrors } = props
  if (!rawDescription && !rawErrors) return null
  return (
    <div className="field-help">
      {rawDescription && <div>{rawDescription}</div>}
      <FieldErrors errors={rawErrors} />
    </div>
  )
}

export function ArrayFieldTemplate(props) {
  const { items, schema } = props
  const itemName = "More"
  return (
    <React.Fragment>
      {items.map(elm => (
        <div className="array-item">
          {elm.children}
          <Button
            className="array-rm-item"
            icon="delete"
            onClick={elm.onDropIndexClick(elm.index)}
          />
        </div>
      ))}
      {props.canAdd && (
        <Button primary onClick={props.onAddClick}>
          <Icon name="plus" /> Add {itemName}
        </Button>
      )}
    </React.Fragment>
  )
}

export function ObjectFieldTemplate(props) {
  return (
    <div className="field-object-props">
      {props.properties.map((elm, i) => (
        <React.Fragment key={i}>{elm.content}</React.Fragment>
      ))}
    </div>
  )
}

export function ErrorList({ errors }) {
  return <Message negative header="Errors" icon="remove circle">    
    <p>
      rawDescriptionLog
    </p>
</Message>
}