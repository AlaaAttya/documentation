import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

const renderHits = (renderOptions, isFirstRender) => {
    const addAttributesToEmptyElements = () => {
        aisHits.classList.add('ais-Hits');
        aisHitsList.classList.add('ais-Hits-list');
    };

    const appendEmptyElements = () => {
        container.appendChild(aisHits);
        aisHits.appendChild(aisHitsList);
    };

    const addHitsToEmptyElements = () => {
        container.querySelector('.ais-Hits-list').innerHTML = joinedListItemsHTML;
    };

    const truncateContent = (content, length) => {
        if (content.length > length) {
            return `${content.slice(0, length)} ...`;
        } else {
            return content;
        }
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray) => {
        return hitsArray
            .map((item) => {
                const link = item.relpermalink;
                const hitData = item._highlightResult;
                const subcategory = hitData.subcategory.value;
                const title = hitData.title.value;
                const sectionHeader = hitData.section_header ? hitData.section_header.value : null;
                const content = hitData.content.value;
                const tag = item.tags[0];
                let category = 'Documentation';

                switch (tag) {
                    case 'guide':
                        category = 'Guides';
                        break;

                    case 'getting_started':
                        category = 'Getting Started';
                        break;

                    case 'integrations':
                        category = 'Integrations';
                        break;

                    case 'api_latest':
                        category = 'API';
                        break;

                    default:
                        break;
                }

                const displayTitle = sectionHeader ? sectionHeader : title;
                const displayContent = truncateContent(content, 145);

                return `
                    <li class="ais-Hits-item">
                        <a href="${link}" target="_blank" rel="noopener noreferrer">
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-category">${category}</p>
                                <i class="ais-Hits-category-spacer icon-right-carrot-normal"></i>
                                <p class="ais-Hits-subcategory">${subcategory}</p>
                                <i class="ais-Hits-category-spacer icon-right-carrot-normal"></i>
                                <p class="ais-Hits-title"><strong>${displayTitle}</strong></p>
                            </div>
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');
    };

    const { widgetParams, hits } = renderOptions;
    const { container } = widgetParams;

    const joinedListItemsHTML = generateJoinedHits(hits, null);

    const aisHits = document.createElement('div');
    const aisHitsList = document.createElement('ol');

    if (isFirstRender) {
        addAttributesToEmptyElements();
        appendEmptyElements();
        return;
    } else {
        addHitsToEmptyElements();
    }
};

export const searchpageHits = connectHits(renderHits);
