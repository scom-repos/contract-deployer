import { Module, Styles, Container, customModule, application, Panel, CodeEditor } from '@ijstech/components';
import Assets from '@modules/assets';
import customStyles from './index.css';

const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Module1 extends Module {
    private codeEditorOptions: CodeEditor;
    private codeEditorResult: CodeEditor;
    private pnlPreview: Panel;

    renderDeployResult(content: string) {
        this.pnlPreview.clearInnerHTML();
        const contentArray = content.split(/\n/gm);
        const elm = contentArray.map((item, key) => {
            const newContent = item.replace(/(<)(.*)(>)/g, '&lt$2&gt');
            return (
                <i-hstack verticalAlignment="center" gap="15px" margin={{ bottom: 4 }}>
                    <i-label caption={`${key + 1}`} width={20} class="text-right prevent-select"></i-label>
                    <i-label caption={newContent}></i-label>
                </i-hstack>
            )
        })
        this.pnlPreview.append(...elm);
    }

    deploy() {
        this.pnlPreview.visible = true;
        const content = this.codeEditorOptions.value || this.codeEditorResult.value || "";
        this.renderDeployResult(content);
    }

    render() {
        return (
            <i-panel class={customStyles} width="100%" padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
                <i-grid-layout
                    width="100%"
                    height="100%"
                    gap={{ column: '1rem', row: '1rem' }}
                    overflow="hidden"
                    templateColumns={['55%', '1fr']}
                    mediaQueries={
                        [
                            {
                                maxWidth: '1150px',
                                properties: {
                                    templateColumns: ['1fr', '1fr']
                                }
                            },
                            {
                                maxWidth: '875px',
                                properties: {
                                    templateColumns: ['1fr']
                                }
                            }
                        ]
                    }
                >
                    <i-tabs width="100%" height="100%">
                        <i-tab
                            caption="Options"
                            font={{ size: '1em' }}
                        >
                            <i-panel height="100%" width="100%" minHeight={500} position='relative'>
                                <i-code-editor id="codeEditorOptions" height="100%" width="100%" position="absolute" language='json'></i-code-editor>
                            </i-panel>
                        </i-tab>
                        <i-tab
                            caption="Result"
                            font={{ size: '1em' }}
                        >
                            <i-panel height="100%" width="100%" minHeight={500} position='relative'>
                                <i-code-editor id="codeEditorResult" height="100%" width="100%" position="absolute" language='json'></i-code-editor>
                            </i-panel>
                        </i-tab>
                    </i-tabs>
                    <i-vstack height="100%" gap="1rem">
                        <i-hstack>
                            <i-button
                                caption="Deploy"
                                padding={{ top: '0.25rem', bottom: '0.25rem', left: '1rem', right: '1rem' }}
                                onClick={this.deploy.bind(this)}
                            ></i-button>
                        </i-hstack>
                        <i-panel
                            id="pnlPreview"
                            class="preview-wrap"
                            visible={false}
                            border={{ width: 1, style: 'solid', color: Theme.divider, radius: 5 }}
                            padding={{ top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }}
                        >
                        </i-panel>
                    </i-vstack>
                </i-grid-layout>
            </i-panel>
        )
    }
}